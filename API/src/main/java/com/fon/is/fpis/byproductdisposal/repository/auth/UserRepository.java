package com.fon.is.fpis.byproductdisposal.repository.auth;

import com.fon.is.fpis.byproductdisposal.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

//    Optional<User> findByIdentifier(String identifier);
//
//    boolean existsByUsername(String username);
//
    @Query(nativeQuery = true, value = "SELECT identifier FROM user u WHERE u.username=:username")
    String getId(@Param("username") String username);
}
