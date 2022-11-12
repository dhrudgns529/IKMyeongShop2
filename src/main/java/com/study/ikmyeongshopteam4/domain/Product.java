package com.study.ikmyeongshopteam4.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
    private int id;
    private String pdt_name;
    private int category_id;
    private int pdt_price;

    private List<ProductDetail> pdt_dtls;

    private List<ProductImgFile> pdt_imgs;

    private int product_total_count;
}
