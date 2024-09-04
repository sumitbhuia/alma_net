"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



const validCollegeEmail = async (
  email: string | undefined
): Promise<boolean> => {
  if (!email) {
    return false;
  }

  const supabase = createClient(); 

  // Fetch the domains from the 'colleges' table
  const { data, error } = await supabase.from("colleges").select("domain");

  if (error) {
    console.error("Error fetching domains:", error);
    return false;
  }

  // Extract the domain from the email
  const inputDomain = email.split("@")[1];

  // Check if the domain exists in the fetched data
  const domainExists = data?.some((row) => row.domain === inputDomain) || false;
  return domainExists;
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const userRole = formData.get("role")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const isValidEmail = await validCollegeEmail(email);

  if (!isValidEmail) {
    console.log("Invalid college email");
    return encodedRedirect("error", "/sign-up", "Invalid college email");
  }

  if (!email || !password || !username || !userRole) {
    return { error: "Email, password, username and role are required" };
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { displayName : username },
      emailRedirectTo: `${origin}/auth/callback`,
      
    },
  });

  if (authError) {
    return encodedRedirect("error", "/sign-up", authError.message);
  }

  const userId = authData.user?.id; 
  
  if (userId) {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        user_role: userRole, 
      })
      .eq('id', userId) 
      .select();

  if (error) {
    console.log("Error updating profile:", error.message);
    return encodedRedirect("error", "/sign-up", "Failed to update profile");
  }
  }
  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link."
  );
};


export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  // #TODO Change endpoint to rediret to after sign-in
  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  // The origin is the URL of the site that the request is coming from
  const origin = headers().get("origin");
  // The callback URL is the URL to redirect to after the user clicks the link in the email
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  // Send the user an email with a link to reset their password
  // {error : AuthError} is the error message if the request fails
  // {error : null} if the request is successful
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  // If an error occurs, log the error message and redirect to the forgot-password page
  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  // If a callback URL is provided, redirect to that URL
  // #TODO Edit callback url sent to mail to redirect to desired page
  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  // If no callback URL is provided, redirect to the forgot-password page
  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

// Function to reset the user's password after they click the link in the email
export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  // If the password is successfully updated, redirect to the reset-password page
  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
