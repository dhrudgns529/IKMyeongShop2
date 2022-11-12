package com.study.ikmyeongshopteam4.service.admin;

import com.study.ikmyeongshopteam4.dto.GoodsListRespDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductListDto;
import com.study.ikmyeongshopteam4.repository.ProductRepository;
import com.study.ikmyeongshopteam4.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class productListServiceImpl implements ProductListService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductListDto> getList(int page) throws Exception {
        int index = (page - 1 )*10;
        List<ProductListDto> productListDtos = new ArrayList<>();

        Map<String, Object> map = new HashMap   <String, Object>();
        map.put("index", index);

        productRepository.getList(map).forEach(list -> {

            productListDtos.add(list.toDto());

        });

        return productListDtos;
    }

}
