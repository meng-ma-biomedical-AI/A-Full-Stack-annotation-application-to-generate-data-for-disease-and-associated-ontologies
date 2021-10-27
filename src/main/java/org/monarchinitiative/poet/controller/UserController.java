package org.monarchinitiative.poet.controller;


import org.monarchinitiative.poet.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

/**
 * This class is an implementation of Spring's Rest Controller. It provides RESTful API's to check users against
 * our database.
 *
 * @author Michael Gargano
 * @since 0.5.0
 */
@RestController
@RequestMapping(value="${api.version}/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * The endpoint to check whether the authenticated auth0 user is in our database or not
     * insert them if they are not.
     *
     * @return ok if we are able to save them or if they are found, otherwise return not found.
     * @since 0.5.0
     */
    @GetMapping(value = "/check", headers = "Accept=application/json")
    public ResponseEntity<?> checkUser(Authentication authentication) {
        
        if(userService.saveOrUpdateUser(authentication)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
