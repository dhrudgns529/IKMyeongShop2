package com.study.ikmyeongshopteam4.domain.admin;


import com.study.ikmyeongshopteam4.dto.GoodsListRespDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductListDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductList {
    private int id;
    private String category_name;
    private String pdt_name;
    private String pdt_design;
    private int pdt_price;

    public ProductListDto toDto() {
        return ProductListDto.builder()
                .productId(id)
                .categoryName(category_name)
                .productName(pdt_name)
                .productPrice(pdt_price)
                .productDesign(pdt_design)
                .build();
    }
}
