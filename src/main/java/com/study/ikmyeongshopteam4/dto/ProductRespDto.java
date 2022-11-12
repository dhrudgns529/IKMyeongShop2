package com.study.ikmyeongshopteam4.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductRespDto {

    private int pdtId;
    private String pdtName;
    private int pdtPrice;
    private List<Object> pdtDesign;
    private List<String> pdtImgs;
}
