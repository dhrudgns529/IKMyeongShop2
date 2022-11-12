package com.study.ikmyeongshopteam4.service.admin;

import com.study.ikmyeongshopteam4.dto.admin.CategoryResponseDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductRegisterReqDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductGetResponseDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductUpdateResponseDto;

import java.util.List;

public interface ProductManagementService {

    public List<CategoryResponseDto> getCategoryList() throws Exception;
    public void productRegister(ProductRegisterReqDto productRegisterReqDto) throws Exception;
    public ProductGetResponseDto getProduct(int pdtId, String pdtDesign) throws Exception;
    public void productSet(ProductUpdateResponseDto productUpdateResponseDto) throws Exception;
}
