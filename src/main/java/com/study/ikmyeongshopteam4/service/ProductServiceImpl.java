package com.study.ikmyeongshopteam4.service;


import com.study.ikmyeongshopteam4.domain.Product;
import com.study.ikmyeongshopteam4.dto.GoodsListRespDto;
import com.study.ikmyeongshopteam4.dto.ProductRespDto;
import com.study.ikmyeongshopteam4.exception.CustomValidationException;
import com.study.ikmyeongshopteam4.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    @Override
    public List<GoodsListRespDto> getProductList(String category, int page, int limitCount) throws Exception {
        List<GoodsListRespDto> productList = new ArrayList<GoodsListRespDto>();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("category", category);
        map.put("index", (page - 1) * limitCount);
        map.put("limitCount", limitCount);

        productRepository.getProductList(map).forEach(goodsProduct -> {
            productList.add(goodsProduct.toDto());
        });
        return productList;
    }


    @Override
    public ProductRespDto getProduct(int pdtId) throws Exception {
        Product product = productRepository.getProduct(pdtId);

        if (product == null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("error", "등록되지 않은 상품입니다.");
            throw new CustomValidationException("Get Product Error", errorMap);
        }
        List<Object> pdtDesign = new ArrayList<>();
        List<String> pdtImgs = new ArrayList<String>();


        product.getPdt_dtls().forEach(design -> {
            Map<String, Object> pdtDtlAndDesign = new HashMap<String, Object>();
            pdtDtlAndDesign.put("pdtDtlId", design.getId());
            pdtDtlAndDesign.put("pdtDesign", design.getPdt_design());
            pdtDtlAndDesign.put("pdtStock", design.getPdt_stock());

            pdtDesign.add(pdtDtlAndDesign);
        });

        product.getPdt_imgs().forEach(img -> {
            pdtImgs.add(img.getSave_name());

        });

        ProductRespDto dto = ProductRespDto.builder()
                .pdtId(product.getId())
                .pdtName(product.getPdt_name())
                .pdtPrice(product.getPdt_price())
                .pdtDesign(pdtDesign)
                .pdtImgs(pdtImgs)
                .build();

        return dto;
    }


}
