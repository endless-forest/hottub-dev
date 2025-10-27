"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/lib/supabaseClient";
import { Calendar, Mail, Phone, Users, TrendingUp, Clock } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string;
  model_interest: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

interface Stats {
  totalLeads: number;
  totalAppointments: number;
  leadsThisWeek: number;
  appointmentsThisWeek: number;
}

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    totalAppointments: 0,
    leadsThisWeek: 0,
    appointmentsThisWeek: 0
  });
  const [activeTab, setActiveTab] = useState<"leads" | "appointments">("leads");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const { data: leadsData } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: appointmentsData } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    if (leadsData) setLeads(leadsData);
    if (appointmentsData) setAppointments(appointmentsData);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    setStats({
      totalLeads: leadsData?.length || 0,
      totalAppointments: appointmentsData?.length || 0,
      leadsThisWeek: leadsData?.filter(l => new Date(l.created_at) > oneWeekAgo).length || 0,
      appointmentsThisWeek: appointmentsData?.filter(a => new Date(a.created_at) > oneWeekAgo).length || 0
    });

    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setAppointments(prev =>
        prev.map(apt => apt.id === id ? { ...apt, status } : apt)
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalLeads}</p>
            <p className="text-sm text-gray-600">Total Leads</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
            <p className="text-sm text-gray-600">Total Appointments</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-8 h-8 text-blue-600" />
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.leadsThisWeek}</p>
            <p className="text-sm text-gray-600">Leads This Week</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.appointmentsThisWeek}</p>
            <p className="text-sm text-gray-600">Appointments This Week</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("leads")}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === "leads"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Leads ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === "appointments"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Appointments ({appointments.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "leads" ? (
              <div className="space-y-4">
                {leads.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No leads yet.</p>
                ) : (
                  leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                          <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {lead.email}
                            </span>
                            {lead.phone && (
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {lead.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(lead.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                        {lead.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No appointments yet.</p>
                ) : (
                  appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{apt.name}</h3>
                          <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {apt.email}
                            </span>
                            {apt.phone && (
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {apt.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <select
                            value={apt.status}
                            onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                            className={`text-xs px-3 py-1 rounded-full font-medium border-2 outline-none transition ${
                              apt.status === "confirmed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : apt.status === "completed"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : apt.status === "cancelled"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-xs text-gray-600 mb-1">Date & Time</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(apt.date).toLocaleDateString()} at {apt.time}
                          </p>
                        </div>
                        {apt.model_interest && (
                          <div className="bg-blue-50 p-3 rounded">
                            <p className="text-xs text-gray-600 mb-1">Model Interest</p>
                            <p className="font-semibold text-gray-900">{apt.model_interest}</p>
                          </div>
                        )}
                      </div>

                      {apt.notes && (
                        <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                          {apt.notes}
                        </p>
                      )}

                      <p className="text-xs text-gray-500 mt-2">
                        Booked: {formatDate(apt.created_at)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
