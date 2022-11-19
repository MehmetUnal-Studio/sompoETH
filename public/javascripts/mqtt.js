const connectUrl = "wss://iomust:eqdhdYeiwHmfZl7o@iomust.cloud.shiftr.io";
const client = mqtt.connect(connectUrl);

const mqttPublish = (data) => {
  client.publish(
    "eth",
    JSON.stringify(data),
    { qos: 0, retain: false },
    function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Published");
      }
    }
  );
};
