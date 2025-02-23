package com.example.SocialMedia.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Component
@Scope("prototype")
public class socialMediaAccounts {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	String username;
	String email;
	String password;
	String confirm_password;
	boolean isProfileCreated;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConfirm_password() {
		return confirm_password;
	}
	public void setConfirm_password(String confirm_password) {
		this.confirm_password = confirm_password;
	}
	public boolean isProfileCreated() {
		return isProfileCreated;
	}
	public void setProfileCreated(boolean isProfileCreated) {
		this.isProfileCreated = isProfileCreated;
	}
	
	@Override
	public String toString() {
		return "socialMediaAccounts [id=" + id + ", username=" + username + ", email=" + email + ", password="
				+ password + ", confirm_password=" + confirm_password + ", isProfileCreated=" + isProfileCreated + "]";
	}
	
	
}
