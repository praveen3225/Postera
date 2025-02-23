package com.example.SocialMedia.model;

import java.util.Arrays;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
@Component
@Scope("prototype")
public class posteraPosts {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String email;
	
	String profile_photo;
	String profile_name;
	String post_photo;
	String caption;
	int likes;
	String comments[];
	
	@ManyToOne
	@JoinColumn(name = "email", referencedColumnName = "email",updatable = false,insertable = false,unique = true)
	@JsonBackReference
	accountProfile profilePosts;


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProfile_photo() {
		return profile_photo;
	}

	public void setProfile_photo(String profile_photo) {
		this.profile_photo = profile_photo;
	}

	public String getProfile_name() {
		return profile_name;
	}

	public void setProfile_name(String profile_name) {
		this.profile_name = profile_name;
	}

	public String getPost_photo() {
		return post_photo;
	}

	public void setPost_photo(String post_photo) {
		this.post_photo = post_photo;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public String[] getComments() {
		return comments;
	}

	public void setComments(String[] comments) {
		this.comments = comments;
	}


	public accountProfile getProfilePosts() {
		return profilePosts;
	}

	public void setProfilePosts(accountProfile profilePosts) {
		this.profilePosts = profilePosts;
	}

	@Override
	public String toString() {
		return "posteraPosts [id=" + id + ", email=" + email + ", profile_photo=" + profile_photo + ", profile_name="
				+ profile_name + ", post_photo=" + post_photo + ", caption=" + caption + ", likes=" + likes
				+ ", comments=" + Arrays.toString(comments) + ", profilePosts=" + profilePosts + "]";
	}

	
	
}
