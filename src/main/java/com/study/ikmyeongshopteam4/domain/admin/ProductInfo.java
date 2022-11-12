package com.study.ikmyeongshopteam4.domain.admin;


import com.study.ikmyeongshopteam4.domain.ProductImgFile;
import com.study.ikmyeongshopteam4.dto.admin.ProductGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInfo {
    private int id;
    private String pdt_name;
    private String category_name;
    private int pdt_dtl_id;
    private int pdt_price;
    private String pdt_design;
    private int pdt_stock;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

    private List<ProductImgFile> product_img_files;

    public ProductGetResponseDto toDto() {
        return ProductGetResponseDto.builder()
                .id(id)
                .pdtName(pdt_name)
                .categoryName(category_name)
                .pdtDtlId(pdt_dtl_id)
                .pdtPrice(pdt_price)
                .pdtDesign(pdt_design)
                .pdtStock(pdt_stock)
                .files(product_img_files)
                .createDate(create_date)
                .updateDate(update_date)
                .build();
    }
}
