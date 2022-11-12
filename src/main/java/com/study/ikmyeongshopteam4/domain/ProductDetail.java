package com.study.ikmyeongshopteam4.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetail {
    private int id;
    private int pdt_id;
    private String pdt_design;
    private int pdt_stock;

    private List<ProductImgFile> product_img_files;
}
