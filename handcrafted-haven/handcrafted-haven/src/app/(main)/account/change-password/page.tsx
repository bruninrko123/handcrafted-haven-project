"use client";
import { FormInput } from "@/app/ui/FormInput";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { changePasswordSchema } from "@/lib/validations/auth";

type FieldErrors = {
  currentPassword?: string;
  newPassword?: string;
};

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setServerError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setServerError("Password and password confirmation do not match");
      return;
    }

    const result = changePasswordSchema.safeParse({
      newPassword,
      currentPassword,
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FieldErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
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

    if (!res.ok) {
      const data = await res.json();
      setServerError(data.error || "Something went wrong");
      return;
    }

    setSuccess("Password changed! Redirecting to login...");
    signOut({ callbackUrl: "/login" });
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
        {errors.currentPassword && (
          <p className="text-red-500 text-sm -mt-4 mb-4">
            {errors.currentPassword}
          </p>
        )}

        <FormInput
          id="newPassword"
          label="New Password:"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Type your password"
          required
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm -mt-4 mb-4">
            {errors.newPassword}
          </p>
        )}

        <FormInput
          id="confirmationPassword"
          label="Password Confirmation:"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Type your password"
          required
        />
        {serverError && (
          <p className="text-red-600 text-sm mb-3">{serverError}</p>
        )}

        {success && <p className="text-green-800 text-sm mb-3">{success}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-[#6B4F3F] py-3 text-white font-semibold hover:opacity-90 transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
