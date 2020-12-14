const express = require("express");
const axios = require("axios");
const app = express();

const currentPut = async () => {
  let response;
  try {
    response = await axios.get(
      "http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=02&p_country_code=1101&p_regday=2020-10-02&p_convert_kg_yn=N&p_item_category_code=200&p_cert_key=111&p_cert_id=222&p_returntype=json"
    );
  } catch (e) {
    console.log(e);
  }
  return response;
};

app.get("/", (req, res) => {
  currentPut().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (response.data.data.error_code === '000') {
      res.json(response.data.data);
    }
    else {
      res.json({error_code: response.data.data.error_code, error_message: "error"})
    }
  });
});

app.listen(8080, () => {
  console.log("Server is running at: http://localhost:8080/");
});
