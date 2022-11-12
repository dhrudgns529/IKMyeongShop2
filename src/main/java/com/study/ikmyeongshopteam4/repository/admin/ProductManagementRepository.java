package com.study.ikmyeongshopteam4.repository.admin;

import com.study.ikmyeongshopteam4.domain.Product;
import com.study.ikmyeongshopteam4.domain.ProductDetail;
import com.study.ikmyeongshopteam4.domain.ProductImgFile;
import com.study.ikmyeongshopteam4.domain.ProductDetail;
import com.study.ikmyeongshopteam4.domain.admin.ProductCategory;
import com.study.ikmyeongshopteam4.domain.admin.ProductInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductManagementRepository {
    public List<ProductCategory> getCategoryList() throws Exception;
    public int findProductByProductName(String pdtName) throws Exception;
    public Product findProductId(String pdtName) throws Exception;
    public int findProductDesign(int pdtId) throws Exception;
    public int saveProduct(Product product) throws Exception;
    public int saveProductDetail(ProductDetail productDetail) throws Exception;
    public int saveImgFiles(List<ProductImgFile> productImgFiles) throws Exception;
    public ProductInfo getProduct(int pdtId, String pdtDesign) throws Exception;
    public int setProduct(Product product) throws Exception;
    public int setProductDetail(ProductDetail productDetail) throws Exception;
    public int deleteImgFiles(Map<String, Object> map) throws Exception;


}
