#include <WiFi.h>
#include <FirebaseESP32.h> //install FirebaseESP32 library by mobizt
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

const char* ssid = "2.4G-J3Kt";    //your wifi ssid
const char* keypass = "bb7QiBcD!";//your wifi password

const char* api_key = "AIzaSyBuP81YRh3hUpo1Hv4fWYwnXlODsSOIr98"; //this should not be changed
const char* database_url = "omnisynchronize-default-rtdb.asia-southeast1.firebasedatabase.app"; //this should not be changed
const char* email = "paralejas@gmail.com"; //paste your email here
const char* password = "afd221"; //paste your password here
const String uid = "mV3HtW0NMafCv3L8VWswgOUk9xh1"; //you can get your UID on your account profile

const byte LED_BUILTIN = 2; //wifi connection indicator

const byte firstRelay = 14; //choose your digital pins
const byte secondRelay = 12;

FirebaseData fbdo;
FirebaseData stream;

FirebaseAuth auth;
FirebaseConfig config;

String parentPath = "/" + uid + "/toggles"; //this should not be changed
String childPath[2] = {"/0", "/1"}; //change depending on the number of your devices

void streamCallback(MultiPathStreamData stream) {
  //data changes listener
  size_t numChild = sizeof(childPath) / sizeof(childPath[0]);
  for (size_t i = 0; i < numChild; i++) {
    if (stream.get(childPath[i])) {
      FirebaseJson json;
      json.setJsonData(stream.value);
      FirebaseJsonData jsonData;
      json.get(jsonData, "state");

      Serial.printf("[Omnisync] [%d] %d\n", i, jsonData.boolValue); // this prints: [Omnisync] [deviceIndex] deviceState
      
      toggleRelay(stream.dataPath.c_str(), jsonData.boolValue);
    }
  }
}

void toggleRelay(String path, bool state) {
  if (path == "/0") {
  digitalWrite(firstRelay, state);
  }
  if (path == "/1") {
    digitalWrite(secondRelay, state);
  }
}

bool getState(String path) {
  return Firebase.getBool(fbdo, path) ? fbdo.to<bool>() : 0;
}

void streamTimeoutCallback(bool timeout) {
  if (timeout)
    Serial.println("[Omnisync] [Stream] timed out, resuming...\n");

  if (!stream.httpConnected())
    Serial.printf("[Omnisync] [Stream] Error code: %d, reason: %s\n\n", stream.httpCode(), stream.errorReason().c_str());
}

void setup() {
  Serial.begin(115200);

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(firstRelay, OUTPUT);
  pinMode(secondRelay, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  digitalWrite(LED_BUILTIN, 0);
  connectToWifi();

  config.api_key = api_key;
  config.database_url = database_url;
  config.token_status_callback = tokenStatusCallback;

  auth.user.email = email;
  auth.user.password = password;

  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096, 1024);
  stream.setBSSLBufferSize(4096, 1024);

  Firebase.begin(&config, &auth);
  Firebase.setDoubleDigits(5);

  size_t numChild = sizeof(childPath) / sizeof(childPath[0]);
  for (size_t i = 0; i < numChild; i++) {
    String path = parentPath + childPath[i] + "/state";
    bool state = getState(path);
    toggleRelay(childPath[i], state);
  }

  stream.keepAlive(5, 5, 1);

  if (!Firebase.beginMultiPathStream(stream, parentPath))
    Serial.printf("[Omnisync] [Stream] begin error, %s\n\n", stream.errorReason().c_str());

  Firebase.setMultiPathStreamCallback(stream, streamCallback, streamTimeoutCallback);
}

void loop() {}

void connectToWifi() {
  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.print("[Omnisync] [WiFi] Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, keypass);
  
  Serial.print("[Omnisync] [WiFi]");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  digitalWrite(LED_BUILTIN, 1);
  Serial.println("");
  Serial.println("[Omnisync] [WiFi] Connected.");
  Serial.print("[Omnisync] [WiFi] [IP] ");
  Serial.println(WiFi.localIP());
}