package com.abhay.Service;

import com.abhay.response.ApiResponse;

public interface ChatbotService {
    ApiResponse getCoinDetails(String prompt) throws Exception;

    String simpleChat(String prompt);
}
