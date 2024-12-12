"use client"

export function getUserInfo()
{
    return JSON.parse(localStorage.getItem('userInfo')) || null;
}