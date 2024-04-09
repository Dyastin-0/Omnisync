#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

const char* ssid = ""; //your wifi ssid
const char* password = "";//your wifi password

const char* api_key = "";//paste the API key here
const char* database_url = "";//paste the database URL here

const byte firstRelay = 16;
const byte secondRelay = 5;
const byte thirdRelay = 4;
const byte fourthRelay = 0;

FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(firstRelay, OUTPUT);
  pinMode(secondRelay, OUTPUT);
  pinMode(thirdRelay, OUTPUT);
  pinMode(fourthRelay, OUTPUT);

  digitalWrite(LED_BUILTIN, 1);
  connectToWifi();

  Serial.printf("[Home Aut] Firebase Client v%s\n", FIREBASE_CLIENT_VERSION);

  config.api_key = api_key;

  auth.user.email = ""; //your email
  auth.user.password = ""; //your password

  config.database_url = database_url;

  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096, 1024);

  Firebase.begin(&config, &auth);

  Firebase.setDoubleDigits(5);
}

void loop() {
  bool firstRelayState = getState("/your_email/toggles/0/state");  //put your email without the dot (sample@gmailcom) at the first level of the path
  bool secondRelayState = getState("/your_email/toggles/1/state"); //you could make a variable, then format it there
  bool thirdRelayState = getState("/your_email/toggles/2/state");  //the index (0, 1, 2, 3) corresponds to what index is displayed
  bool fourthRelayState = getState("/your_email/toggles/3/state"); //at the website

  Serial.printf("[Home Aut] %d%d%d%d\n", //simply printing the values, 1 is on, 0 is off
    firstRelayState,                       
    secondRelayState,
    thirdRelayState,
    fourthRelayState
  );

  digitalWrite(firstRelay, firstRelayState); //write the values to the digital pins
  digitalWrite(secondRelay, secondRelayState);
  digitalWrite(thirdRelay, thirdRelayState);
  digitalWrite(fourthRelay, fourthRelayState);

  delay(1000);
}

void connectToWifi() {
  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.print("[Home Aut] Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  Serial.print("[Home Aut] ");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  digitalWrite(LED_BUILTIN, 0);
  Serial.println("");
  Serial.println("[Home Aut] WiFi connected");
  Serial.print("[Home Aut] IP address: ");
  Serial.println(WiFi.localIP());
}

bool getState(String path) {
  return Firebase.getBool(fbdo, path) ? fbdo.to<bool>() : 0;
}
