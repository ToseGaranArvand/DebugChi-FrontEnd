"use client";

import React, { FC, useEffect, useState } from "react";
interface IErrorSection {
  error?: string;
}
const ErrorSection: FC<IErrorSection> = ({ error }) => {
  if (error) return <p className="mt-4 text-red-500">{error}</p>;
};

export { ErrorSection };
