package com.study.ikmyeongshopteam4.api;

import com.study.ikmyeongshopteam4.dto.CMRespDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductListDto;
import com.study.ikmyeongshopteam4.service.ProductService;
import com.study.ikmyeongshopteam4.service.admin.ProductListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductApi {

    private final ProductService productService;
    private final ProductListService productListService;
    @GetMapping("/goods/{category}")
    public ResponseEntity<?> getGoods(@PathVariable String category, int page, int limitCount) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Successfully", productService.getProductList(category, page, limitCount)));
    }

    //상품 리스트 불러오기
    @GetMapping("/v1/product/{page}")
    public ResponseEntity<?> getProductList(@PathVariable int page) throws Exception {
//        List<ProductListDto> listDtos = new ArrayList<>();
//
//        try {
//            listDtos = productListService.getList(page);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.ok().body(new CMRespDto("failed page", listDtos));
//        }

        return ResponseEntity.ok().body(new CMRespDto("success page", productListService.getList(page)));
    }

    @GetMapping("/product/{pdtId}")
    public ResponseEntity<?> getProduct(@PathVariable int pdtId) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>("Successfully", productService.getProduct(pdtId)));
    }
}
