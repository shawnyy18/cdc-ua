#!/bin/bash

# ==================================================
# ECOKONEK SUPABASE SETUP SCRIPT
# Automated setup for Supabase backend
# ==================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Banner
echo -e "${GREEN}"
cat << "EOF"
╔═══════════════════════════════════════════════╗
║                                               ║
║   🌿 ECOKONEK SUPABASE SETUP                 ║
║   Automated Backend Configuration            ║
║                                               ║
╚═══════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Check if setup directory exists
if [ ! -d "supabase/setup" ]; then
    print_error "Setup directory not found! Are you in the project root?"
    exit 1
fi

# Step 1: Check prerequisites
print_info "Checking prerequisites..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    print_warning "Supabase CLI not found"
    echo ""
    echo "You have two options:"
    echo "1. Install Supabase CLI: npm install -g supabase"
    echo "2. Use Supabase Dashboard (Manual setup)"
    echo ""
    read -p "Install Supabase CLI now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Installing Supabase CLI..."
        npm install -g supabase
        print_success "Supabase CLI installed"
    else
        print_warning "Skipping CLI setup. You'll need to run migrations manually."
        print_info "See SUPABASE_SETUP_GUIDE.md for manual setup instructions"
        exit 0
    fi
fi

print_success "Supabase CLI found"

# Step 2: Check environment variables
print_info "Checking environment configuration..."

if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found"
    
    if [ -f ".env.example" ]; then
        print_info "Creating .env.local from .env.example..."
        cp .env.example .env.local
        print_success "Created .env.local"
        print_warning "Please edit .env.local with your Supabase credentials"
        
        # Try to open in default editor
        if command -v code &> /dev/null; then
            code .env.local
        elif command -v nano &> /dev/null; then
            nano .env.local
        else
            print_info "Please edit .env.local manually"
        fi
        
        echo ""
        read -p "Press Enter after you've added your credentials..."
    else
        print_error ".env.example not found. Cannot create .env.local"
        exit 1
    fi
else
    print_success ".env.local exists"
fi

# Check if critical variables are set
if grep -q "your-project-id" .env.local 2>/dev/null; then
    print_error ".env.local still contains placeholder values!"
    print_info "Please update .env.local with your actual Supabase credentials"
    exit 1
fi

print_success "Environment configuration looks good"

# Step 3: Ask user what they want to do
echo ""
print_info "What would you like to do?"
echo "1. Link to existing Supabase project and run migrations"
echo "2. Just show me what to do manually (dry run)"
echo "3. Exit"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        # Link to Supabase project
        print_info "Linking to Supabase project..."
        echo ""
        print_warning "You'll need your Supabase project reference ID"
        print_info "Find it in: Supabase Dashboard > Project Settings > General"
        echo ""
        read -p "Enter your project reference ID: " project_ref
        
        supabase link --project-ref "$project_ref"
        
        if [ $? -eq 0 ]; then
            print_success "Successfully linked to project"
            
            # Run migrations
            print_info "Running database migrations..."
            echo ""
            print_warning "This will execute ALL migration files in order"
            print_info "Migrations to run:"
            echo "  1. 01_complete_schema.sql"
            echo "  2. 02_row_level_security.sql"
            echo "  3. 03_functions_triggers.sql"
            echo "  4. 04_storage_setup.sql"
            echo ""
            read -p "Continue? (y/n) " -n 1 -r
            echo
            
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # Run each migration
                for file in supabase/setup/*.sql; do
                    filename=$(basename "$file")
                    print_info "Running $filename..."
                    
                    if supabase db execute --file "$file"; then
                        print_success "$filename completed"
                    else
                        print_error "$filename failed"
                        print_warning "Check the error above and fix before continuing"
                        exit 1
                    fi
                done
                
                print_success "All migrations completed successfully!"
                echo ""
                print_info "Next steps:"
                echo "  1. Configure storage buckets in Supabase Dashboard"
                echo "  2. Set up authentication providers"
                echo "  3. Create your first admin user"
                echo "  4. Run: npm run dev"
                echo ""
                print_success "Setup complete! 🎉"
            else
                print_info "Skipping migrations"
            fi
        else
            print_error "Failed to link to project"
            exit 1
        fi
        ;;
        
    2)
        # Dry run - show manual steps
        print_info "Manual Setup Instructions:"
        echo ""
        echo "1. Log in to Supabase Dashboard: https://supabase.com/dashboard"
        echo "2. Select your project"
        echo "3. Go to SQL Editor"
        echo "4. Create a new query and run each file in order:"
        echo ""
        echo "   📄 supabase/setup/01_complete_schema.sql"
        echo "      Creates all database tables and indexes"
        echo ""
        echo "   📄 supabase/setup/02_row_level_security.sql"
        echo "      Sets up security policies"
        echo ""
        echo "   📄 supabase/setup/03_functions_triggers.sql"
        echo "      Creates database functions and triggers"
        echo ""
        echo "   📄 supabase/setup/04_storage_setup.sql"
        echo "      Configures storage buckets (optional - can do via UI)"
        echo ""
        echo "5. Go to Storage and create buckets:"
        echo "   - profile-images (public)"
        echo "   - post-images (public)"
        echo "   - marketplace-images (public)"
        echo ""
        echo "6. Configure authentication providers (Settings > Authentication)"
        echo ""
        echo "7. Create your first admin user:"
        echo "   - Register via your app"
        echo "   - In SQL Editor, run:"
        echo "     UPDATE users SET is_admin = true WHERE email = 'your@email.com';"
        echo ""
        print_info "See SUPABASE_SETUP_GUIDE.md for detailed instructions"
        ;;
        
    3)
        print_info "Exiting setup"
        exit 0
        ;;
        
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Setup script completed!"
