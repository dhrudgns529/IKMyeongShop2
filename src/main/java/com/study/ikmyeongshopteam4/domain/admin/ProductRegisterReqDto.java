package com.study.ikmyeongshopteam4.domain.admin;

import com.study.ikmyeongshopteam4.domain.Product;
import com.study.ikmyeongshopteam4.domain.ProductDetail;
import com.study.ikmyeongshopteam4.dto.validation.ValidationGroups;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Data
public class ProductRegisterReqDto {

    private int id;
    private int categoryId;
    private String name;
    private int price;
    private String design;
    private int stock;

    private List<MultipartFile> files;
    public Product toProductEntity() {
        return Product.builder()
                .category_id(categoryId)
                .pdt_name(name)
                .pdt_price(price)
                .build();
    }

    public ProductDetail toProductDetailEntity() {
        return ProductDetail.builder()
                .pdt_id(id)
                .pdt_design(design)
                .pdt_stock(stock)
                .build();
    }
}
