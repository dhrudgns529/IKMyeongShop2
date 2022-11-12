package com.study.ikmyeongshopteam4.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ProductManagementController {

    @GetMapping("/product/register")
    public String productRegister() {
        return "admin/product_add";
    }

    @GetMapping("/product/{pdtId}/{pdtDesign}")
    public String productUpdate(@PathVariable("pdtId") String pdtId,@PathVariable("pdtDesign") String pdtDesign) {
        return "admin/product_update";
    }
}
