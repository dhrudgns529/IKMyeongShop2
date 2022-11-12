package com.study.ikmyeongshopteam4.dto.admin;

import com.study.ikmyeongshopteam4.domain.ProductImgFile;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class ProductGetResponseDto {
    private int id;
    private String pdtName;
    private String categoryName;
    private int pdtDtlId;
    private int pdtPrice;
    private String pdtDesign;
    private int pdtStock;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    private List<ProductImgFile> files;
}
