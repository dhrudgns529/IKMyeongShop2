package com.study.ikmyeongshopteam4.controller;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AccountController {

    @GetMapping("/account/login")
    public String login() {
        return "account/login";
    }

    @GetMapping("/account/register")
    public String register() {
        return "account/register";
    }

    @GetMapping("/account/register_ok")
    public String registerOk(Model model, @RequestParam String username) {
        model.addAttribute("username", username);
        return "account/register_ok";
    }

}
