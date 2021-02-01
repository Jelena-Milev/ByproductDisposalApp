package com.fon.is.fpis.byproductdisposal.security.filter;

import com.fon.is.fpis.byproductdisposal.security.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    @Autowired
    private final JwtConfig jwtConfig;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtConfig jwtConfig) {
        super(authenticationManager);
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        UsernamePasswordAuthenticationToken auth = parseToken(request);
        if(auth != null){
            SecurityContextHolder.getContext().setAuthentication(auth);
        } else {
            SecurityContextHolder.clearContext();
        }
        // go to the next filter in the filter chain
        filterChain.doFilter(request, response);
    }


    private UsernamePasswordAuthenticationToken parseToken(HttpServletRequest request){
        String header = request.getHeader(jwtConfig.getHeader());
        if(header == null || !header.startsWith(jwtConfig.getPrefix())){
            return null;
        }
        String token = header.replace(jwtConfig.getPrefix(), "");
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(jwtConfig.getSecret().getBytes())
                    .parseClaimsJws(token)
                    .getBody();
            String username = claims.getSubject();
            if(username == null || username.isEmpty())
                return null;
            @SuppressWarnings("unchecked")
            List<String> authorities = (List<String>) claims.get("authorities");

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    username, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

            return auth;
        } catch (Exception e) {
            // In case of failure. Make sure it's clear; so guarantee user won't be authenticated
            SecurityContextHolder.clearContext();
        }
        return null;
    }
}
