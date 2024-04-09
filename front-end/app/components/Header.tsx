"use client";
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserData } from '../actions';
import { isUserLoggedIn } from '../actions';
import { logoutUser } from '../actions';

interface HeaderProps {
  groupId?: string;
}

const Header: React.FC<HeaderProps> = ({ groupId }) => {
  const [groupID, setGroupID] = useState<string | null>(null);

  useEffect(() => {
    getUserData().then((data) => {
      setGroupID(data ? data.group : null);
    });
  }, []);

  if(isUserLoggedIn()){
    return (
      <div>
        <div className="px-5">
          <header className="flex justify-between items-center py-5 px-20 shadow-sm">
            <div className="flex">
              <p className="text-m font-light px-6 text-gray-500">
                <Link href="/">Contest</Link>
              </p>
              <p className="text-m font-light px-3 text-gray-500">
                <a href={`/rankings/${groupID}`}>Rankings</a>
              </p>
              <p className="text-m font-light px-3 text-gray-500">
                <a href={`/rankings/${groupID}/settings`}>Group Settings</a>
              </p>
            </div>
  
            <div className="flex items-center">
              <Button variant="default">
                <Link href="/login/register">Sign-Up</Link>
              </Button>
              <span className="mx-2 text-gray-500">/</span>
              <Button variant="outline" type="submit">
                <Link href="/login">Log-out</Link>
                <button onClick={() => logoutUser()}></button>
              </Button>
            </div>
          </header>
        </div>
        <Separator />
      </div>
    );
  } else {
    return (
      <div>
        <div className="px-5">
          <header className="flex justify-between items-center py-5 px-20 shadow-sm">
            <div className="flex">
              <p className="text-m font-light px-6 text-gray-500">
                <Link href="/">Contest</Link>
              </p>
            </div>
            <div className="flex items-center">
              <Button variant="default">
                <Link href="/login/register">Sign-Up</Link>
              </Button>
              <span className="mx-2 text-gray-500">/</span>
              <Button variant="outline" type="submit">
                <Link href="/login">Log-In</Link>
              </Button>
            </div>
          </header>
        </div>
        <Separator />
      </div>
    )
  }

};

export default Header;
