package com.chatbot.AI.Chatbot.dto;
import java.util.List;

public record ChatGPTResponse(List<Choice> choices) {

    public record Choice(Message message){

        public record Message(String role, String content){

        }
    }
}
