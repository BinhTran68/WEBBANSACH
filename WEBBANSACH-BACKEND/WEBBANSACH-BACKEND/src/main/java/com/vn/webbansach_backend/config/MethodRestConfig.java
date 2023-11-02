package com.vn.webbansach_backend.config;

import com.vn.webbansach_backend.entity.NguoiDung;
import com.vn.webbansach_backend.entity.TheLoai;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MethodRestConfig implements RepositoryRestConfigurer {

    private String url = "http://localhost:3000";

    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        cors.addMapping("/**")
                .allowedOrigins(url)
                .allowedMethods("GET", "POST", "PUT", "DELETE");


        HttpMethod[] disableMethodList  =  {
                HttpMethod.POST,
                HttpMethod.PUT,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
        };
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toArray(Class[]::new));

//        disableMethods(TheLoai.class, config, disableMethodList); // Chặn các phương thức này với thể loại
//        disableMethods(NguoiDung.class, config, new HttpMethod[] {HttpMethod.DELETE});

    }
    private void disableMethods (
            Class c
            ,RepositoryRestConfiguration configurer
            , HttpMethod[] methods) {
        configurer.getExposureConfiguration().forDomainType(c)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(methods)))
        .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(methods));
    }
}
