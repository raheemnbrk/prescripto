import { useState, useEffect, useRef } from "react";
import ProfileSkeleton from "@/components/loading/profileSkeleton";
import { useUser, useUpdateProfile } from "@/hooks/useUser";
import {
  FiCamera,
  FiEdit2,
  FiMail,
  FiPhone,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../@/components/ui/popover";
import { Calendar } from "../../../@/components/ui/calendar";
import { format } from "date-fns";

export default function ProfilePage() {
  const { data: user, isLoading } = useUser();
  const { mutate: update, isPending } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name ?? "",
      phone: user.phoneNumber ?? "",
      dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
      gender: user.gender ?? "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    if (form.name) formData.append("name", form.name);
    if (form.phone) formData.append("phoneNumber", form.phone);
    if (form.dob) formData.append("dob", form.dob);
    if (form.gender) formData.append("gender", form.gender);
    if (image) formData.append("image", image);
    update(formData, {
      onSuccess: () => {
        setIsEditing(false);
        setImage(null);
        setPreview(null);
      },
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImage(null);
    setPreview(null);
    if (user) {
      setForm({
        name: user.name ?? "",
        phone: user.phoneNumber ?? "",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        gender: user.gender ?? "",
      });
    }
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your personal information
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-main hover:bg-main/80 text-white text-sm font-medium rounded-md transition-all active:scale-95 cursor-pointer"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-indigo-100 overflow-hidden">
              <img
                src={
                  preview ??
                  (user?.image || "https://www.gravatar.com/avatar/?d=mp")
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-main rounded-md flex items-center justify-center shadow-md hover:bg-main/80 transition-all cursor-pointer"
                >
                  <FiCamera className="w-4 h-4 text-white" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <span className="inline-block mt-1 px-3 py-1 bg-indigo-50 text-main/80 text-xs font-medium rounded-full border border-indigo-100 capitalize">
              {user?.role?.toLowerCase()}
            </span>
            <p className="text-gray-400 text-sm mt-2">
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-5">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
              <FiUser className="w-4 h-4 text-main" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Full Name</p>
              {isEditing ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-0.5 text-sm font-medium text-gray-800 border-b border-indigo-300 outline-none w-full bg-transparent"
                />
              ) : (
                <p className="text-sm font-medium text-gray-800">
                  {user?.name ?? "—"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
              <FiMail className="w-4 h-4 text-main" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800">
                {user?.email ?? "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
              <FiPhone className="w-4 h-4 text-main" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Phone</p>
              {isEditing ? (
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-0.5 text-sm font-medium text-gray-800 border-b border-indigo-300 outline-none w-full bg-transparent"
                />
              ) : (
                <p className="text-sm font-medium text-gray-800">
                  {user?.phoneNumber ?? "—"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
              <FiCalendar className="w-4 h-4 text-main" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Date of Birth</p>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 mt-0.5 text-sm font-medium text-gray-800 border-b border-indigo-300 w-full pb-0.5 cursor-pointer">
                      <FiCalendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      {form.dob
                        ? format(new Date(form.dob), "MMMM d, yyyy")
                        : "Pick a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.dob ? new Date(form.dob) : undefined}
                      onSelect={(d) =>
                        d &&
                        setForm((prev) => ({
                          ...prev,
                          dob: d.toISOString().split("T")[0],
                        }))
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <p className="text-sm font-medium text-gray-800">
                  {user?.dob
                    ? new Date(user.dob).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
              <FiUser className="w-4 h-4 text-main" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">Gender</p>
              {isEditing ? (
                <Select
                  value={form.gender}
                  onValueChange={(val) =>
                    setForm((prev) => ({ ...prev, gender: val }))
                  }
                >
                  <SelectTrigger className="h-8 text-sm border-0 border-b border-indigo-300 rounded-none px-0 shadow-none focus:ring-0 cursor-pointer">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male" className="cursor-pointer">
                      Male
                    </SelectItem>
                    <SelectItem value="female" className="cursor-pointer">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm font-medium text-gray-800 capitalize">
                  {user?.gender ?? "—"}
                </p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-6 mt-2 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex-1 bg-main hover:bg-main/80 text-white font-medium py-2.5 rounded-md transition-all active:scale-95 text-sm disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2.5 rounded-md transition-all text-sm border border-gray-200 disabled:opacity-60 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
