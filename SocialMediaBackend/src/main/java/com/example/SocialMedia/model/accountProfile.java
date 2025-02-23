package com.example.SocialMedia.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Component
@Entity
@Scope("prototype")
public class accountProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String profile_name;
	String dob;
	String gender;
	String phone_number;
	String location;
	String portfolio;
	String profile_photo;
	String[] bio;
	String email;
	
	@OneToOne
	@JoinColumn(name = "email",referencedColumnName = "email",unique = true,insertable = false,updatable = false)
	socialMediaAccounts account;
	
	@OneToMany(mappedBy = "profilePosts",orphanRemoval = true,cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<posteraPosts> posts = new ArrayList<>();
	
	public List<posteraPosts> getPosts() {
		return posts;
	}
	public void setPosts(List<posteraPosts> posts) {
		this.posts = posts;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public socialMediaAccounts getAccount() {
		return account;
	}
	public void setAccount(socialMediaAccounts account) {
		this.account = account;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getProfile_name() {
		return profile_name;
	}
	public void setProfile_name(String profile_name) {
		this.profile_name = profile_name;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getPortfolio() {
		return portfolio;
	}
	public void setPortfolio(String portfolio) {
		this.portfolio = portfolio;
	}
	public String getProfile_photo() {
		return profile_photo;
	}
	public void setProfile_photo(String profile_photo) {
		this.profile_photo = profile_photo;
	}
	public String[] getBio() {
		return bio;
	}
	public void setBio(String[] bio) {
		this.bio = bio;
	}
	@Override
	public String toString() {
		return "accountProfile [id=" + id + ", profile_name=" + profile_name + ", dob=" + dob + ", gender=" + gender
				+ ", phone_number=" + phone_number + ", location=" + location + ", portfolio=" + portfolio
				+ ", profile_photo=" + profile_photo + ", bio=" + Arrays.toString(bio) + ", email=" + email
				+ ", account=" + account + ", posts=" + posts + "]";
	}

}
