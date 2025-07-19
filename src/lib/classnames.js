/**
 * Utility function to join CSS classes
 */
export default function cls(...classes) {
    // `filter(Boolean)` filters out falsy values,
    // in addition to allowing for cleaner conditionals (e.g `condition && 'flex gap-2'`)
    return classes.filter(Boolean).join(" ");
}
