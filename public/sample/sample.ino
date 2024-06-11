#include <WiFi.h>
#include <FirebaseClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

#define wifiSsid "2.4G-J3Kt"
#define wifiPassword "bb7QiBcD!"

#define apiKey "AIzaSyBuP81YRh3hUpo1Hv4fWYwnXlODsSOIr98"
#define databaseUrl "omnisynchronize-default-rtdb.asia-southeast1.firebasedatabase.app"

#define userEmail "paralejas@gmail.com"
#define userPassword "afd221"
const char* userPath = "/mV3HtW0NMafCv3L8VWswgOUk9xh1/toggles";

void asyncCB(AsyncResult &aResult);

DefaultNetwork network;

UserAuth user_auth(apiKey, userEmail, userPassword);

FirebaseApp app;

WiFiClientSecure ssl_client1, ssl_client2;

using AsyncClient = AsyncClientClass;

AsyncClient aClient(ssl_client1, getNetwork(network)), aClient2(ssl_client2, getNetwork(network));

RealtimeDatabase Database;

const uint8_t ledBuiltin = 2;

const uint8_t relays[2] = {14, 12};
bool state;

void setup() {
  Serial.begin(115200);

  pinMode(ledBuiltin, OUTPUT);
  for (size_t i = 0; i < sizeof(relays); i++) {
    pinMode(relays[i], OUTPUT);
  }

  digitalWrite(ledBuiltin, 0);

  WiFi.begin(wifiSsid, wifiPassword);

  Serial.print("[Omnisync] [Wi-Fi] Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  digitalWrite(ledBuiltin, 1);
  Serial.println();
  Serial.print("[Omnisync] [Wi-Fi] [IP]: ");
  Serial.println(WiFi.localIP());

  Firebase.printf("[Omnisync] [Firebase] [v] %s\n", FIREBASE_CLIENT_VERSION);

  Serial.println("[Omnisync] [Firebase] Initializing app...");

  ssl_client1.setInsecure();
  ssl_client2.setInsecure();

  initializeApp(aClient2, app, getAuth(user_auth), asyncCB, "authTask");
  app.getApp<RealtimeDatabase>(Database);

  Database.url(databaseUrl);
  Database.setSSEFilters("get,put,patch,keep-alive,cancel,auth_revoked");
  Database.get(aClient, userPath, asyncCB, true, "State Listener");

  Serial.println("[Omnisync] [Firebase] Initialized.");
}

void loop() {
  app.loop();
  Database.loop();
}

void asyncCB(AsyncResult &aResult) {
  if (aResult.available()) {
    RealtimeDatabaseResult &RTDB = aResult.to<RealtimeDatabaseResult>();
    if (RTDB.isStream()) {
      Serial.println("[Omnisync] [State Listener] ----------------------------");
      Firebase.printf("[Omnisync] [State Listener] [task] %s\n", aResult.uid().c_str());
      Firebase.printf("[Omnisync] [State Listener] [event] %s\n", RTDB.event().c_str());
      Firebase.printf("[Omnisync] [State Listener] [path] %s\n", RTDB.dataPath().c_str());
      Firebase.printf("[Omnisync] [State Listener] [data] %s\n", RTDB.to<const char *>());
      toggleRelay(RTDB.to<const char *>(), String(RTDB.dataPath().c_str()));
    }
  }
  Firebase.printf("[Omnisync] [Heap]: %d\n", ESP.getFreeHeap());
}

void toggleRelay(const char* serializedDoc, String dataPath) {
  DynamicJsonDocument deserializeDoc(1024);
  deserializeJson(deserializeDoc, serializedDoc);
  if (deserializeDoc.is<JsonArray>()) {
    JsonArray array = deserializeDoc.as<JsonArray>();
    for (size_t i = 0; i < array.size(); i ++) {
      JsonObject object = array[i];
      state = object["state"];
      digitalWrite(relays[i], state);
    }
  } else {
    state = deserializeDoc["state"];
    digitalWrite(relays[dataPath.charAt(1) - '0'], state);
  }
} 