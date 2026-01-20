package com.abhay.Service;

import com.abhay.dto.CoinDto;
import com.abhay.response.ApiResponse;
import com.abhay.response.FunctionResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ChatBotServiceImpl implements ChatbotService {

    String GEMINI_API_KEY = "AIzaSyBWM_8XkFysWnj6VfgKurspa5JD03D3_Eg";

    private double convertToDouble(Object value) {
        if (value instanceof Integer) return ((Integer) value).doubleValue();
        if (value instanceof Long) return ((Long) value).doubleValue();
        if (value instanceof Double) return (Double) value;
        if (value == null) return 0.0;
        try { return Double.parseDouble(value.toString()); }
        catch (Exception e) { return 0.0; }
    }

    // ============================================================
    // 1. COIN API FIXED
    // ============================================================
    public CoinDto makeApiRequest(String currencyName) throws Exception {

        String url = "https://api.coingecko.com/api/v3/coins/" + currencyName;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> body = responseEntity.getBody();

        if (body == null) throw new Exception("Coin not found");

        Map<String, Object> image = (Map<String, Object>) body.get("image");
        Map<String, Object> market = (Map<String, Object>) body.get("market_data");

        Map<String, Object> currentPrice = (Map<String, Object>) market.get("current_price");
        Map<String, Object> marketCap = (Map<String, Object>) market.get("market_cap");
        Map<String, Object> volume = (Map<String, Object>) market.get("total_volume");
        Map<String, Object> high24 = (Map<String, Object>) market.get("high_24h");
        Map<String, Object> low24 = (Map<String, Object>) market.get("low_24h");

        CoinDto dto = new CoinDto();

        dto.setId((String) body.get("id"));
        dto.setName((String) body.get("name"));
        dto.setSymbol((String) body.get("symbol"));
        dto.setImage((String) image.get("large"));

        dto.setCurrentPrice(convertToDouble(currentPrice.get("usd")));
        dto.setMarketCap(convertToDouble(marketCap.get("usd")));
        dto.setMarketCapRank(convertToDouble(market.get("market_cap_rank")));
        dto.setTotalVolume(convertToDouble(volume.get("usd")));

        dto.setHigh24h(convertToDouble(high24.get("usd")));
        dto.setLow24h(convertToDouble(low24.get("usd")));

        dto.setPriceChange24h(convertToDouble(market.get("price_change_24h")));
        dto.setPriceChangePercentage24h(convertToDouble(market.get("price_change_percentage_24h")));
        dto.setMarketCapChange24h(convertToDouble(market.get("market_cap_change_24h")));
        dto.setMarketCapChangePercentage24h(convertToDouble(market.get("market_cap_change_percentage_24h")));

        dto.setCirculatingSupply(convertToDouble(market.get("circulating_supply")));
        dto.setTotalSupply(convertToDouble(market.get("total_supply")));

        return dto;
    }


    // ============================================================
    // 2. GEMINI FUNCTION CALL FIXED
    // ============================================================
    public FunctionResponse getFunctionResponse(String prompt) {

        String API = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_API_KEY;

        JSONObject functionSchema = new JSONObject()
                .put("name", "getCoinDetails")
                .put("description", "Extract cryptocurrency name")
                .put("parameters", new JSONObject()
                        .put("type", "object")
                        .put("properties", new JSONObject()
                                .put("currencyName", new JSONObject()
                                        .put("type", "string")
                                        .put("description", "Cryptocurrency ID")
                                )
                        )
                        .put("required", new JSONArray().put("currencyName"))
                );

        JSONObject request = new JSONObject()
                .put("contents", new JSONArray()
                        .put(new JSONObject()
                                .put("parts", new JSONArray()
                                        .put(new JSONObject().put("text", prompt))
                                )
                        )
                )
                .put("tools", new JSONArray()
                        .put(new JSONObject()
                                .put("functionDeclarations", new JSONArray().put(functionSchema))
                        )
                );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RestTemplate rest = new RestTemplate();
        ResponseEntity<String> response =
                rest.postForEntity(API, new HttpEntity<>(request.toString(), headers), String.class);

        JSONObject json = new JSONObject(response.getBody());

        JSONObject functionCall = json
                .getJSONArray("candidates")
                .getJSONObject(0)
                .getJSONObject("content")
                .getJSONArray("parts")
                .getJSONObject(0)
                .optJSONObject("functionCall");

        // ------------------------------------------------------
        // FIX 1 : FUNCTION CALL IS NULL → FALLBACK EXTRACTION
        // ------------------------------------------------------
        if (functionCall == null) {

            // Fallback: Ask Gemini to extract coin name manually
            String extractPrompt = "Extract ONLY the cryptocurrency ID (like bitcoin, ethereum, solana) from: " + prompt;

            JSONObject fallbackReq = new JSONObject()
                    .put("contents", new JSONArray()
                            .put(new JSONObject()
                                    .put("parts", new JSONArray()
                                            .put(new JSONObject().put("text", extractPrompt))
                                    )
                            )
                    );

            ResponseEntity<String> fallbackResp =
                    rest.postForEntity(API, new HttpEntity<>(fallbackReq.toString(), headers), String.class);

            String extracted = new JSONObject(fallbackResp.getBody())
                    .getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .optString("text")
                    .trim()
                    .toLowerCase();

            // If no coin detected → throw clean error
            if (extracted.isEmpty()) {
                throw new RuntimeException("Unable to detect cryptocurrency name from prompt.");
            }

            FunctionResponse fallbackOut = new FunctionResponse();
            fallbackOut.setFunctionName("getCoinDetails");
            fallbackOut.setCurrencyName(extracted);
            return fallbackOut;
        }

        // ------------------------------------------------------
        // IF FUNCTION CALL EXISTS → USE IT
        // ------------------------------------------------------
        String currency = functionCall.getJSONObject("args").getString("currencyName");

        FunctionResponse out = new FunctionResponse();
        out.setFunctionName("getCoinDetails");
        out.setCurrencyName(currency);

        return out;
    }


    // ============================================================
    // 3. FINAL AI RESPONSE FIXED
    // ============================================================
//    @Override
//    public ApiResponse getCoinDetails(String prompt) throws Exception {
//
//        FunctionResponse fx = getFunctionResponse(prompt);
//
//        CoinDto coin = makeApiRequest(fx.getCurrencyName().toLowerCase());
//
//        String API = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" + GEMINI_API_KEY;
//
//        JSONObject request = new JSONObject()
//                .put("contents", new JSONArray()
//                        .put(new JSONObject()
//                                .put("parts", new JSONArray()
//                                        .put(new JSONObject()
//                                                .put("text",
//                                                        "Here are the latest live details for " +
//                                                                coin.getName() + " (" + coin.getSymbol() + "):\n\n" +
//                                                                coin.toString()
//                                                )
//                                        )
//                                )
//                        )
//                );
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        RestTemplate rest = new RestTemplate();
//        ResponseEntity<String> finalRes =
//                rest.postForEntity(API, new HttpEntity<>(request.toString(), headers), String.class);
//
//        String text = new JSONObject(finalRes.getBody())
//                .getJSONArray("candidates")
//                .getJSONObject(0)
//                .getJSONObject("content")
//                .getJSONArray("parts")
//                .getJSONObject(0)
//                .getString("text");
//
//        ApiResponse api = new ApiResponse();
//        api.setMessage(text);
//
//        return api;
//    }
    @Override
    public ApiResponse getCoinDetails(String prompt) throws Exception {

        FunctionResponse fx = getFunctionResponse(prompt);
        CoinDto coin = makeApiRequest(fx.getCurrencyName().toLowerCase());

        String lower = prompt.toLowerCase();
        String message;

        // Price only
        if (lower.contains("price") && !lower.contains("market cap")) {
            message = "The current price of " + coin.getName() + " is $"
                    + String.format("%,.2f", coin.getCurrentPrice()) + ".";
        }

        // Market cap only
        else if (lower.contains("market cap")) {
            message = "The market cap of " + coin.getName() + " is $"
                    + String.format("%,.2f", coin.getMarketCap()) + ".";
        }

        // Volume only
        else if (lower.contains("volume")) {
            message = "The 24-hour trading volume of " + coin.getName() + " is $"
                    + String.format("%,.2f", coin.getTotalVolume()) + ".";
        }

        // Default full details
        else {
            message =
                    "<b>Here are the latest details for " + coin.getName() + ":</b><br/><br/>" +
                            "• <b>Price:</b> $" + String.format("%,.2f", coin.getCurrentPrice()) + "<br/>" +
                            "• <b>Market Cap:</b> $" + String.format("%,.2f", coin.getMarketCap()) + "<br/>" +
                            "• <b>24h Volume:</b> $" + String.format("%,.2f", coin.getTotalVolume());

        }

        ApiResponse api = new ApiResponse();
        api.setMessage(message);
        return api;
    }

    // ============================================================
    // 4. SIMPLE CHAT FIXED
    // ============================================================
    @Override
    public String simpleChat(String prompt) {

        String API =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_API_KEY;

        JSONObject request = new JSONObject()
                .put("contents", new JSONArray()
                        .put(new JSONObject()
                                .put("parts", new JSONArray()
                                        .put(new JSONObject().put("text", prompt))
                                )
                        )
                );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RestTemplate rest = new RestTemplate();
        ResponseEntity<String> response =
                rest.postForEntity(API, new HttpEntity<>(request.toString(), headers), String.class);

        return response.getBody();
    }
}
