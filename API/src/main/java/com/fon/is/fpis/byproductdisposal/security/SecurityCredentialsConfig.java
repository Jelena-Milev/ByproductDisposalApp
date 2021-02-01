package com.fon.is.fpis.byproductdisposal.security;

import com.fon.is.fpis.byproductdisposal.repository.auth.UserRepository;
import com.fon.is.fpis.byproductdisposal.security.filter.JwtAuthenticationFilter;
import com.fon.is.fpis.byproductdisposal.security.filter.JwtAuthorizationFilter;
import com.fon.is.fpis.byproductdisposal.security.filter.MyAuthenticationFailureHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

@EnableWebSecurity
public class SecurityCredentialsConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtConfig jwtConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint((req, res, e) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage()))
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, jwtConfig.getUri()).permitAll()
                .antMatchers(HttpMethod.POST, "/byproduct-disposal/byproduct/**").hasRole("USER")
                .anyRequest().authenticated()
                .and()
//                .authorizeRequests(authorizeRequests ->
//                        authorizeRequests
//                            .antMatchers(HttpMethod.POST, jwtConfig.getUri()).permitAll()
////                            .antMatchers(HttpMethod.POST, "/byproduct-disposal/byproduct/**").hasRole("USER")
//                            .anyRequest().authenticated()
//                )
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtConfig, myAuthenticationFailureHandler(), userRepository))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), jwtConfig))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public JwtConfig jwtConfig() {
        return new JwtConfig();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationFailureHandler myAuthenticationFailureHandler() {
        return new MyAuthenticationFailureHandler();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
