package com.study.ikmyeongshopteam4.domain.admin;

import com.study.ikmyeongshopteam4.domain.ProductDetail;

public class ProductRegisterDtlReqDto {
    private int pdtId;
    private String pdtDesign;
    private int pdtStock;

    public ProductDetail toEntity() {
        return ProductDetail.builder()
                .pdt_id(pdtId)
                .pdt_design(pdtDesign)
                .pdt_stock(pdtStock)
                .build();
    }
}
