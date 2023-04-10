import { useRouter } from "next/router"
import { useMemo } from "react"
import { classNames } from "../../lib/utils"

export default function Sidebar(props) {
  const router = useRouter()
  const { account } = router.query

  let menuItems = [

    { id: "0", label: `Collection`, link: { pathname: "/account/[account]/collection", query: { account: account } } },
  //  { id: "1", label: `Basic`, link: { pathname: "/account/[account]", query: { account: account } } },

  ]


  const activeMenu = useMemo(
    () => {
      const subItems = menuItems.flatMap((menu) => {
        if (menu.subItems) { return menu.subItems }
        return []
      })

      const allItems = menuItems.map((menu) => { return { ...menu, subItems: null } }).concat(subItems)

      const item = allItems.find((menu) => {
        if (router.pathname == "/account/[account]/collection") {
          return menu.link.pathname == router.pathname
        } else if (menu.label != "Collection" && menu.link && (router.pathname.includes(menu.link.pathname))) {
          return true
        }
        return false
      })
      return item
    },
    [router.pathname]
  )

  const getNavItemClasses = (menu) => {
    return classNames(
      activeMenu && activeMenu.id === menu.id ? "bg-drizzle" : "",
      menu.link ? "hover:bg-drizzle-light cursor-pointer" : "",
      menu.isSubItem ? "text-sm sm:text-base leading-5 sm:leading-6" : "text-base sm:text-lg font-bold leading-6 sm:leading-8",
      "flex flex-col rounded w-full overflow-hidden whitespace-nowrap px-2 py-1",
    )
  }

  return (
    <div
      className="flex flex-col p-3 rounded-xl"
    >
      <div className="flex flex-col gap-y-4 items-start">
        {menuItems.map(({ label: label, ...menu }, index) => {
          const classes = getNavItemClasses(menu)
          return (
            <div key={`${label}_${index}`} className="w-full">
              {
                menu.link ? (
                  <button className={classes} onClick={() => {
                    router.push(menu.link, undefined, { shallow: true, scroll: false })
                  }}>
                    <label className="cursor-pointer">{label}</label>
                  </button>
                ) : <label className={classes}>{label}</label>
              }

              {
                menu.subItems ? (
                  <div className="flex flex-col mt-1 gap-y-1">{
                    menu.subItems.map(({ label: subLabel, ...subMenu }, index) => {
                      const classes = getNavItemClasses(subMenu)
                      return (
                        <div key={`${subLabel}_${index}`} className="w-full pl-1">
                          <button className={classes} onClick={() => {
                            router.push(subMenu.link, undefined, { shallow: true, scroll: false })
                          }}>
                            <label className={`cursor-pointer hidden sm:block`}>{subLabel}</label>
                            <label className={`cursor-pointer block sm:hidden`}>{subMenu.smLabel}</label>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ) : null
              }
            </div>
          )
        })}
      </div>

    </div >
  )
}