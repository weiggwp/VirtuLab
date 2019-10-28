//package backend.LoginConfig;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.*;
//
//@Configuration
////@EnableWebMvc
//public class MVCConfig implements WebMvcConfigurer {
//
//    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/login").setViewName("login");
//        registry.addViewController("/register_instructor").setViewName("register_instructor");
//        registry.addViewController("/signup").setViewName("signup");
//    }
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/signup").allowedOrigins("http://localhost:3001");
//    }
//
////    public void addCorsMappings(CorsRegistry registry) {
////        registry.addMapping("/**")
////                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
////                .allowedOrigins("http://localhost:3001");;
////    }
////    @Override
////    public void addResourceHandlers(ResourceHandlerRegistry registry) {
////        registry
////                .addResourceHandler("/static/**")
////                .addResourceLocations("/static/")
////                .setCachePeriod(3600)   ;
////    }
//
//}