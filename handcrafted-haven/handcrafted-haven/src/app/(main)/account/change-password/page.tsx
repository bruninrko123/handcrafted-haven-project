"use client";
import { FormInput } from "@/app/ui/FormInput";
import { useState } from "react";
import { signOut } from "next-auth/react";
export default function ChangePassword(){
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Password and confirmation password do not match");
            return;
        }
        
      const res = await fetch(`/api/change-password/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            currentPassword,
            newPassword,
            
        }),
      });

      if (res.ok) {
          alert("Password changed! Please log in again");
          signOut({ callbackUrl: "/login" });
      }
    };

    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-400 justify-self-center mt-5 w-[400px] rounded p-2"
        >
          <FormInput
            id="currentPassword"
            label="Current Password:"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Type your password"
            required
          />

          <FormInput
            id="newPassword"
            label="New Password:"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Type your password"
            required
          />

          <FormInput
            id="confirmationPassword"
            label="Password Confirmation:"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Type your password"
            required
                />
                

          <button
            type="submit"
            className=" bg-blue-600 p-4 rounded w-full hover:bg-blue-700 text-white font-medium py-3"
          >
            Change Password
          </button>
        </form>
      </div>
    );


}