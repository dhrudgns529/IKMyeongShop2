package com.study.ikmyeongshopteam4.api.admin;


import com.study.ikmyeongshopteam4.service.admin.ProductManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ProductAdminAPi {

    private final ProductManagementService productManagementService;

}
