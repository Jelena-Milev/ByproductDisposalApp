package com.fon.is.fpis.byproductdisposal.security;

import com.fon.is.fpis.byproductdisposal.model.auth.User;
import com.fon.is.fpis.byproductdisposal.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service // It has to be annotated with @Service.
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username: "+username+" not found"));
        return new UserDetailsImpl(user);
    }
}


