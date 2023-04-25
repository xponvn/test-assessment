import React from 'react'
import Image from "next/image"
import { RenderIcon } from '@test-assessment/ui-components'

export default function AvatarDropdown() {
  return (
    <div className="flex items-center">
      <div style={{
        filter: "drop-shadow(2px 2px 0px #00D4FF)",
      }}>
        <Image
          src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
          alt='avatar'
          width={24}
          height={24}
        />
      </div>
      <div className="ml-2 relative">
        <input hidden type="checkbox" id="avatar-dropdown" />
        <label htmlFor='avatar-dropdown' className="avatar-view text-13 leading-6 text-neutral-border cursor-pointer flex items-center">
          Chloe Dao
          <RenderIcon name="chevron-down" className="icon-chevron-down text-neutral-placeholder ml-1 transition-all" />
        </label>
        <ul className="menu-dropdown bg-white rounded-[2px] absolute top-8 right-2 transition-all">
          <li className="p-2 cursor-pointer">Profile</li>
          <li className="p-2 cursor-pointer">Notification</li>
          <li className="p-2 cursor-pointer">Setting</li>
        </ul>
      </div>
    </div>
  )
}
