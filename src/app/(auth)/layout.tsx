import React from 'react'


interface AuthLayoutProps {
    children: React.ReactNode;
  }

const Authlayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
     {children}
    </div>
  )
}

export default Authlayout