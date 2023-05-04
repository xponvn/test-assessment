import React from 'react'

export type Tabs = {
  id: string;
  label: string;
  total: number;
}

export type SegmentProps = {
  tabs: Tabs[];
  activeTab?: string;
  onChange: (value: string) => void;
}
export const Segment =  React.forwardRef(
  (
    {tabs, activeTab, onChange}: SegmentProps,
    ref
  ) => {
    const defuultActiveIndex = tabs.findIndex((tab) => tab.id===activeTab);
    const [currentTabIndex, setCurrentTabIndex] = React.useState(defuultActiveIndex??0);
    const tabTranslate = [
      'translate-x-0',
      'translate-x-[150px]',
      'translate-x-[300px]',
    ]
    const activeContentStyle = [
      `after:content-[""] after:bg-neutral-disable after:absolute after:bottom-auto after:left-0 after:w-[1px] after:h-[calc(100%-2px)]
      before:content-[""] before:bg-neutral-disable before:absolute before:bottom-auto before:right-0 before:w-[1px] before:h-[calc(100%-2px)]`
    ]
    const onChangeTab = (tabId: string, index:number) => {
      setCurrentTabIndex(index)
      onChange(tabId);
    }
    return (
      <div className='border border-solid border-neutral-border p-1 w-fit flex items-center max-h-[40px]'>
        {tabs.map((tab, index) => (
        <div  className={`relative flex items-center justify-center z-20 p-1 px-3 transition ease-out delay-250 select-none cursor-pointer  min-w-[150px]
                      ${currentTabIndex===index||activeTab===tab.id?"text-neutral-text-primary":"text-neutral-placeholder hover:bg-neutral-table-header"}
                      ${(index>0&&index<tabs.length-1)? `${activeContentStyle}`: ''}
                      `}
              id={tab.id}
              key={tab.id}
          onClick={() => onChangeTab(tab.id, index)}
        >
          {tab.label} ({tab.total})
        </div>
        ))}
        <div className={`slider absolute z-10 flex min-w-[150px] h-[30px] p-1 px-3 transition ease-out delay-250 bg-neutral-disable ${tabTranslate[currentTabIndex]}`}>
        </div>
      </div>
    )
  })
