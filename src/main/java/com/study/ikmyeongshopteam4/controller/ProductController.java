package com.study.ikmyeongshopteam4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ProductController {

    @GetMapping("/goods/{category}")
    public String loadGoods(@PathVariable String category) {
        return "goods/goods_list";
    }

    @GetMapping("/product/{pdtId}")
    public String loadProductDetail(@PathVariable int pdtId) {
        return "goods/goods_view";
    }
}
