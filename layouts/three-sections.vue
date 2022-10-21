<template>
    <div bg="primary dark:primaryOp" text="secondaryOp dark:secondary" h="screen">
        <div flex="~ basis-1/2">
            <slot/>
        </div>

        <div flex="~ col basis-1/2">
            <div flex="~ basis-1/2" border="l secondary dark:secondaryOp">
                <slot name="righttop"/>
            </div>
            <div flex="~ basis-1/2">
                <slot name="rightbottom"/>
            </div>
        </div>
    </div>
</template>