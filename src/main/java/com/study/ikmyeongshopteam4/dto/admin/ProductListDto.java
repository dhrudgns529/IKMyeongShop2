package com.study.ikmyeongshopteam4.dto.admin;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductListDto {

    private int productId;
    private String categoryName;
    private String productName;
    private int productPrice;
    private String productDesign;
}
