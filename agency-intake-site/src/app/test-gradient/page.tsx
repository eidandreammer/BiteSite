'use client'

import { ProjectCTA } from '@/components/CallToAction'
import { PrimaryToSecondaryGradient } from '@/components/DynamicGradient'
import ThemeDebugger from '@/components/ThemeDebugger'
import ThemeToggle from '@/components/ThemeToggle'
import SimpleBackgroundSelector from '@/components/SimpleBackgroundSelector'


export default function TestGradientPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gradient Test Page
          </h1>
          <div className="flex items-center gap-4">
            <SimpleBackgroundSelector />
            <ThemeToggle />
          </div>
        </div>

        <div className="space-y-8">
          {/* Test 1: Component-based gradient */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Test 1: ProjectCTA Component
            </h2>
            <ProjectCTA />
          </div>

          {/* Test 2: Direct gradient component */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Test 2: Direct Gradient Component
            </h2>
            <PrimaryToSecondaryGradient
              className="p-8 rounded-2xl text-white"
              direction="to-r"
              intensity="medium"
            >
              <h3 className="text-2xl font-bold mb-4">Direct Gradient Test</h3>
              <p className="text-lg mb-6 opacity-90">This should show a gradient from primary to secondary colors.</p>
            </PrimaryToSecondaryGradient>
          </div>

          {/* Test 3: CSS variables test */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Test 3: CSS Variables Test
            </h2>
            <div 
              className="p-8 rounded-2xl text-white"
              style={{ 
                background: `linear-gradient(to-r, var(--color-primary, rgb(99, 102, 241)), var(--color-secondary, rgb(255, 255, 255)))`
              }}
            >
              <h3 className="text-2xl font-bold mb-4">CSS Variables Test</h3>
              <p className="text-lg mb-6 opacity-90">This uses CSS variables directly.</p>
              <div className="text-sm opacity-75">
                <p>Primary: <code>{typeof document !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || 'Not set' : 'Loading...'}</code></p>
                <p>Secondary: <code>{typeof document !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--color-secondary') || 'Not set' : 'Loading...'}</code></p>
              </div>
            </div>
          </div>

          {/* Test 4: Color swatches */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Test 4: Color Swatches
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600 mx-auto mb-2"
                  style={{ background: 'var(--color-primary)' }}
                ></div>
                <div className="text-sm font-medium">Primary</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Button BG</div>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600 mx-auto mb-2"
                  style={{ background: 'var(--color-secondary)' }}
                ></div>
                <div className="text-sm font-medium">Secondary</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Button Text</div>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600 mx-auto mb-2"
                  style={{ background: 'var(--color-tertiary)' }}
                ></div>
                <div className="text-sm font-medium">Tertiary</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Complement</div>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-lg border-2 border-gray-300 dark:border-gray-600 mx-auto mb-2"
                  style={{ background: 'var(--color-quaternary)' }}
                ></div>
                <div className="text-sm font-medium">Quaternary</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Accent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Debugger */}
        <ThemeDebugger />
      </div>
    </div>
  )
}
