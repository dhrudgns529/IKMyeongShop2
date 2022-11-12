package com.study.ikmyeongshopteam4.service.admin;

import com.study.ikmyeongshopteam4.dto.admin.ProductListDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductListService {

    public List<ProductListDto> getList(int page) throws Exception;
}
