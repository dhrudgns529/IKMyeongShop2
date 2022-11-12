package com.study.ikmyeongshopteam4.dto.admin;

import com.study.ikmyeongshopteam4.domain.Product;
import com.study.ikmyeongshopteam4.domain.ProductDetail;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class ProductUpdateResponseDto {
    private int id;
    private int pdtDtlId;
    private int pdtPrice;
    private String pdtDesign;
    private int pdtStock;
    private List<String> deleteImgFiles;
    private List<MultipartFile> files;

    public Product toProductEntity() {
        return Product.builder()
                .id(id)
                .pdt_price(pdtPrice)
                .build();
    }

    public ProductDetail toProductDetailEntity() {
        return ProductDetail.builder()
                .pdt_id(pdtDtlId)
                .pdt_design(pdtDesign)
                .pdt_stock(pdtStock)
                .build();
    }
}
