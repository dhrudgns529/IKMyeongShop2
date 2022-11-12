package com.study.ikmyeongshopteam4.domain.admin;


import com.study.ikmyeongshopteam4.dto.admin.CategoryResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductCategory {
    private int id;
    private String category_name;

    public CategoryResponseDto toDto() {
        return CategoryResponseDto.builder()
                .id(id)
                .name(category_name)
                .build();
    }
}